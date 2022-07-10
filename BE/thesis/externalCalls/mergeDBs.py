import json
import os
from turtle import title
import re
from sentence_transformers import SentenceTransformer, util
from difflib import SequenceMatcher
import distance
import textdistance
import copy


# Load settings
# scopus = open(
#     "ScopusSaved.json")

# scopusDB = json.load(scopus)
# scopus.close()

# orcid = open(
#     "OrcidSaved.json")

# orcidDB = json.load(orcid)
# orcid.close()


def textSimirality(title1, title2):

    # model = SentenceTransformer('all-MiniLM-L6-v2')

    # # Sentences are encoded by calling model.encode()
    # emb1 = model.encode(title1, convert_to_tensor=True)
    # emb2 = model.encode(title2, convert_to_tensor=True)

    # cos_sim = util.cos_sim(emb1, emb2)
    # print(textdistance.hamming.normalized_similarity(title1, title2))
    # print("text1", title1)
    # print("text2", title2)

    if (textdistance.hamming.normalized_similarity(title1, title2) > 0.7):
        return True
    else:
        return False
    # print("Sequence", SequenceMatcher(None, title1, title2).ratio())
    # print("Levenstaien", distance.levenshtein(title1, title2))
    # print("Text Distance", textdistance.hamming.normalized_similarity(title1, title2))


def titleClean(text):
    # Removes special characters, spaces and makes all the string lowercase
    # text = ''.join(e for e in text if e.isalnum()).lower()

    # Removes special characters and makes all the string lowercase
    text = " ".join(re.findall(r"[a-zA-Z0-9]+", text)).lower()
    return text


# textSimirality(titleClean("I love banana"),
#                titleClean("I   love @!-.  BananaS  "))

def checkDate(date1, date2):
    if (date1 == None or date2 == None):
        return True
    else:
        # tsekaroume an diaferoun gia panw apo 2 xronia ta publications
        if ((int(date1[0: 4]) <= int(date2[0: 4])+2) and (int(date1[0: 4]) >= int(date2[0: 4])-2)):
            return True
        else:
            return False


# print(checkDate("2003", "2001"))


def mergeFunc(mergedDB, toBeMergedDB, source):
    newAdditionDB = []
    if len(mergedDB) == 0:
        newAdditionDB = toBeMergedDB
        for item in newAdditionDB:
            item['source'] = source
        return newAdditionDB
    else:
        for publication in toBeMergedDB:
            # Ean to DOI den einai null
            if (publication['doi'] != None):

                # ean to DOI brethei idio me kapoio allo prospername
                if any(pub['doi'] == publication['doi'] for pub in mergedDB):
                    pass
                # allios tsekaroume me to onoma
                else:
                    # Ean vrethei allo publication me idio onoma prospername kai +-2 publication year
                    if any((textSimirality(titleClean(pub['title']), titleClean(publication['title']))) and (checkDate(pub['publishedDate'], publication['publishedDate'])) for pub in mergedDB):
                        # if any((titleClean(pub['title']) == titleClean(publication['title'])) or (textSimirality(titleClean(pub['title']), titleClean(publication['title']))) for pub in mergedDB):
                        # if any(pub['title'] == publication['title'] for pub in mergedDB):
                        pass
                    else:
                        # Ean den vrethei allo publication me idio onoma
                        temp = publication
                        temp['source'] = source
                        newAdditionDB.append(temp)
            # ean den exoume DOI
            else:

                # Ean vrethei allo publication me idio onoma prospername kai +-2 publication year
                if any((textSimirality(titleClean(pub['title']), titleClean(publication['title']))) and (checkDate(pub['publishedDate'], publication['publishedDate'])) for pub in mergedDB):
                    # if any((titleClean(pub['title']) == titleClean(publication['title'])) or (textSimirality(titleClean(pub['title']), titleClean(publication['title']))) for pub in mergedDB):
                    # if any(pub['title'] == publication['title'] for pub in mergedDB):
                    pass
                else:
                    # Ean den vrethei allo publication me idio onoma
                    temp = publication
                    temp['source'] = source
                    newAdditionDB.append(temp)

        return newAdditionDB


def removeDuplicatesDB(arr):
    indecesToRemove = []
    newArr = []
    for index in range(len(arr)):

        tempArr = copy.deepcopy(arr)
        for index2 in range(len(tempArr)):
            if (index != index2 and not(index in indecesToRemove)):
                if ((tempArr[index2]['doi'] == arr[index]['doi']) and (arr[index]['doi'] != None)):
                    indecesToRemove.append(index2)
                if ((textSimirality(titleClean(tempArr[index2]['title']), titleClean(
                        arr[index]['title']))) and (checkDate(tempArr[index2]['publishedDate'], arr[index]['publishedDate']))):
                    indecesToRemove.append(index2)
    print("indecesToRemove", indecesToRemove)
    for idx in range(len(arr)):
        if (not(idx in indecesToRemove)):

            newArr.append(arr[idx])
    return newArr


def itemsToAdd(papersList, scopusList, orcidList):
    toAdd = []

    if (len(scopusList) > 0):
        scopusRemovedDuplicates = removeDuplicatesDB(scopusList)
        with open("ScDupli.json", "w") as outfile:
            json.dump(scopusRemovedDuplicates, outfile)
        with open("ScNonDupli.json", "w") as outfile:
            json.dump(scopusList, outfile)
        # print("Test1", len(scopusRemovedDuplicates))
        # print("scopusList", len(scopusList))
    merge1 = mergeFunc(papersList, scopusRemovedDuplicates, "Scopus")
    if (len(merge1) > 0):
        papersList = papersList+merge1
        toAdd = toAdd+merge1

    if (len(orcidList) > 0):
        orcidRemoveDuplicates = removeDuplicatesDB(orcidList)
        with open("OrDupli.json", "w") as outfile:
            json.dump(orcidRemoveDuplicates, outfile)
        with open("OrNonDupli.json", "w") as outfile:
            json.dump(orcidList, outfile)
        # print("Test2", len(orcidRemoveDuplicates))
        # print("orcidList", len(orcidList))
        merge2 = mergeFunc(papersList, orcidRemoveDuplicates, "Orcid")
        if (len(merge2) > 0):
            toAdd = toAdd + merge2

    return toAdd


# finalDB = itemsToAdd([], scopusDB, orcidDB)
# print("Scopus Length:", len(scopusDB))
# print("Orcid Length:", len(orcidDB))
# print("Final Length:", len(finalDB))

# with open("Final.json", "w") as outfile:
#     json.dump(finalDB, outfile)
