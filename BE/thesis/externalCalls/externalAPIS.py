import requests
import json
import os

# get current working directory
cwd = os.getcwd()

# get files in directory
files = os.listdir(cwd)


# Load settings
# for local run only
# settings = open(
#     "config/config.json")
settings = open(
    f"{cwd}/thesis/externalCalls/config/config.json")
config = json.load(settings)
settings.close()

# Auth Info
scopus_key = config["scopusKey"]
orcid_key = config["orcidKey"]

# External base urls for calls
scopus_url = config["scopusURL"]
orcid_url = config["orcidURL"]

# -----------------\ Helpers /---------------------------


def citationHelper(citation):
    if (citation):
        tempCitation = citation.split(',')
        temp = []

        for i in range(len(tempCitation)):
            if "volume" in tempCitation[i] or "pages" in tempCitation[i]:
                tempString = tempCitation[i].replace('{', "")
                tempString = tempString.replace('}', "")
                temp.append(tempString)

        if len(temp) > 0:
            citString = ",".join(temp)
            finalDict = dict(e.split(' = ') for e in citString.split(','))
            return finalDict
        else:
            return None
    else:
        return None


def dateHelper(dateFetched):
    if (dateFetched == None):
        return None
    else:
        year = dateFetched["year"]['value'] if dateFetched["year"] else "1970"
        month = dateFetched["month"]['value'] if dateFetched["month"] else "01"
        day = dateFetched["day"]['value'] if dateFetched["day"] else "01"
        return f"{year}-{month}-{day}"


def authorsList(contributors):
    creators = []
    if len(contributors) > 0:
        for idx in range(len(contributors)):
            creators.append(contributors[idx]["credit-name"]["value"])

        return ";".join(creators).replace(",", "").replace(";", ",")
    else:
        return None


def removeDashAndCapitalize(text):
    text = text.title().replace("-", " ")
    return text


# -----------------\ SCOPUS /---------------------------
def get_user_data_SCOPUS(userID):
    print("SCOPUS API")
    currentCursor = '*'

    parameters = {"apikey": scopus_key,
                  "query": "au-id({})".format(userID),
                  #   "view": "COMPLETE",
                  #   "cursor": currentCursor,
                  #   "count": 15,

                  }
    response = requests.get(scopus_url, params=parameters)
    if response.status_code == 200:
        response_JSON = response.json()
        with open("Scopus.json", "w") as outfile:
            json.dump(response_JSON, outfile)
        if (response_JSON['search-results']["opensearch:totalResults"] == "0"):
            return None
        else:
            res = response_JSON['search-results']['entry']
            docData = []
            for index in range(len(res)):
                entr = {}

                entr['title'] = res[index]["dc:title"] if "dc:title" in res[index].keys(
                ) else None
                entr['publicationName'] = res[index]["prism:publicationName"] if "prism:publicationName" in res[index].keys(
                ) else None
                entr['description'] = res[index]["subtypeDescription"] if "subtypeDescription" in res[index].keys(
                ) else None
                entr['publicationType'] = res[index]["prism:aggregationType"] if "prism:aggregationType" in res[index].keys(
                ) else None
                entr['authors'] = res[index]["dc:creator"] if "dc:creator" in res[index].keys(
                ) else None
                entr['link'] = res[index]["link"][2]['@href'] if res[index]["link"][2] else None
                entr['doi'] = res[index]["prism:doi"] if "prism:doi" in res[index].keys(
                ) else None
                entr['volume'] = res[index]["prism:volume"] if "prism:volume" in res[index].keys(
                ) else None
                entr['pageRange'] = res[index]["prism:pageRange"] if "prism:pageRange" in res[index].keys(
                ) else None
                entr['publishedDate'] = res[index]["prism:coverDate"] if "prism:coverDate" in res[index].keys(
                ) else None

                docData.append(entr)
            return docData
            # with open("ScopusSaved.json", "w") as outfile:
            #     json.dump(docData, outfile)
            # with open(f"{cwd}/thesis/externalCalls/ScopusSaved.json", "w") as outfile:
            #     json.dump(docData, outfile)
    else:
        print(
            f"There's a {response.status_code} error with your request")
        return None

# -----------------\ ORCID /---------------------------


def get_user_data_detailed_ORCID(userID, workIDs):
    print("ORCID API")
    # Call for detailed info for each work
    res = requests.get(f"{orcid_url}/{userID}/works/{workIDs}", headers={
        "Authorization": "Bearer {}".format(orcid_key), "Accept": "application/vnd.orcid+json"})
    if res.status_code == 200:
        res_JSON = res.json()
        with open("ORCID.json", "w") as outfile:
            json.dump(res_JSON, outfile)
        res = res_JSON['bulk']
        docData = []

        for index in range(len(res)):
            data = res[index]["work"]
            entr = {}

            # ------------------ CITATION -----------------------------
            citation = citationHelper(
                data['citation']['citation-value'] if data['citation'] else None)
            # ---------------------------------------------------------

            entr['title'] = data["title"]["title"]["value"] if data["title"] else None
            entr['publicationName'] = data["journal-title"]["value"] if data["journal-title"] else None
            # entr['description'] = data["short-description"] if "short-description" in data.keys(
            # ) else None
            entr['description'] = removeDashAndCapitalize(data["type"]) if "type" in data.keys(
            ) else None
            entr['publicationType'] = removeDashAndCapitalize(data["type"]) if "type" in data.keys(
            ) else None
            entr['authors'] = authorsList(data["contributors"]["contributor"])
            entr['link'] = data["url"]["value"] if data["url"] else None
            entr['doi'] = data["external-ids"]["external-id"][0]['external-id-value'] if data["external-ids"] and data["external-ids"]["external-id"][0]['external-id-type'] == "doi" else None
            entr['volume'] = citation['volume'] if citation and "volume" in citation.keys(
            ) else None
            entr['pageRange'] = citation['pages'] if citation and "pages" in citation.keys(
            ) else None
            entr['publishedDate'] = dateHelper(
                data["publication-date"])

            docData.append(entr)
        return docData

    else:
        print(
            f"There's a {res.status_code} error with your request")
        return None


def get_user_data_ORCID(userID):
    response = requests.get(f"{orcid_url}/{userID}/works", headers={
                            "Authorization": "Bearer {}".format(orcid_key), "Accept": "application/vnd.orcid+json"})
    if response.status_code == 200:
        response_JSON = response.json()

        tempWork = []
        # loop through each user's summary work and keep ids of each work so we can fetch more details for every work
        for index in range(len(response_JSON['group'])):
            tempWork.append(response_JSON['group'][index]
                            ['work-summary'][0]['put-code'])
        # convert work from list to comma separated string

        if (len(tempWork) > 0):

            if (len(tempWork) > 100):
                splitedSize = 100  # items per chart
                tempWork_splited = [tempWork[x:x+splitedSize]
                                    for x in range(0, len(tempWork), splitedSize)]
                finalData = []
                for item in tempWork_splited:
                    workData = ",".join(map(str, item))
                    finalData = finalData + \
                        get_user_data_detailed_ORCID(userID, workData)
                # with open("test.json", "w") as outfile:
                #     json.dump(finalData, outfile)
                return finalData

            else:
                work = ",".join(map(str, tempWork))

                ela = get_user_data_detailed_ORCID(userID, work)
                with open("OrcidSaved.json", "w") as outfile:
                    json.dump(ela, outfile)
                return ela

        else:
            return None

    else:
        print(
            f"There's a {response.status_code} error with your request")
        return None


# get_user_data_SCOPUS("55918072400") #sidirop
# get_user_data_ORCID("0000-0002-3352-0868") #sidirop
# get_user_data_SCOPUS("23390597600")  # ougia
# get_user_data_ORCID("0000-0003-1094-2520")  # ougia
# get_user_data_SCOPUS("7003525351") #diamantaras
# get_user_data_ORCID("0000-0003-1373-4022")  # diamantaras
