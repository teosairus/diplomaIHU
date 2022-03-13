from tokenize import group
import requests
import json

# Load settings
settings = open("./config.json")
config = json.load(settings)
settings.close()

# Auth Info
scopus_key = config["scopusKey"]
orcid_key = config["orcidKey"]

# External base urls for calls
scopus_url = "https://api.elsevier.com/content/search/scopus"
orcid_url = "https://pub.orcid.org/v3.0"


# -----------------\ SCOPUS /---------------------------
def get_user_data_SCOPUS(userID):
    currentCursor = '*'

    parameters = {"apikey": scopus_key,
                  "query": "au-id({})".format(userID),
                  "cursor": currentCursor,
                  "count": 200, }
    response = requests.get(scopus_url, params=parameters)
    if response.status_code == 200:
        response_JSON = response.json()
        with open("Scopus.json", "w") as outfile:
            json.dump(response_JSON, outfile)
        return response_JSON
    else:
        print(
            f"There's a {response.status_code} error with your request")
        return None

# -----------------\ ORCID /---------------------------


def get_user_data_detailed_ORCID(userID, workIDs):
    # Call for detailed info for each work
    res = requests.get(f"{orcid_url}/{userID}/works/{workIDs}", headers={
        "Authorization": "Bearer {}".format(orcid_key), "Accept": "application/vnd.orcid+json"})
    if res.status_code == 200:
        res_JSON = res.json()
        with open("ORCID.json", "w") as outfile:
            json.dump(res_JSON, outfile)
        return res_JSON
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
            work = ",".join(map(str, tempWork))
            get_user_data_detailed_ORCID(userID, work)
        else:
            return None

    else:
        print(
            f"There's a {response.status_code} error with your request")
        return None


get_user_data_SCOPUS(55918072400)
# get_user_data_ORCID("0000-0002-3352-0868")
