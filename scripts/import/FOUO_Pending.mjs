import {
  saveSolidDatasetAt,
  createSolidDataset,
  setBoolean,
  setDate,
  setStringNoLocale,
  setInteger,
} from "@inrupt/solid-client";
import * as d3 from 'd3';
import { TPP } from "../../vocab.mjs";
import { DCTERMS } from "@inrupt/vocab-common-rdf";
import { createItem, setItemWithUUID} from "garden-kit";

async function etl(csv, resourceUrl, setDatum) {
  const data = await d3.csv(csv);
  let dataset = createSolidDataset();
  for (const datum of data) {
    dataset = setDatum(dataset, datum);
  }
  return saveSolidDatasetAt(resourceUrl, dataset);
}

const Dates = ["Date of last review", "Date"];
const Bools = ["Audited", "Co-offenders", "Affiliation with FTO", "Hate Crime", "LEO Informant", "Previous similar crime", "Combat veteran"];
const Nums = ["# killed", "# injured", "Age"];

const CustomFields = {
  Date: TPP.date,
  "Date descriptor": TPP.dateDescriptor,
  "Case ID": TPP.caseID,
  "Group identifier": TPP.groupID,
  "Full legal name": TPP.fullLegalName,
  "First name": TPP.firstName,
  "Family name": TPP.familyName,
  "Other names/aliases": TPP.aliases,
  "Co-offenders": TPP.coOffenders,
  "Reason for inclusion": TPP.reasonForInclusion,
  "Name of case": TPP.nameOfCase,
  Jurisdiction: TPP.jurisdiction,
  "Location: country": TPP.country,
  "Location: state": TPP.state,
  "Location: city": TPP.city,
  "People vs. property": TPP.peopleVsProperty,
  "Physical target": TPP.phsicalTarget,
  "Ideological target": TPP.ideologicalTarget,
  "Ideological affiliation": TPP.ideologicalAffiliation,
  "Affiliation with FTO": TPP.affiliationWithFTO,
  "Group affiliation": TPP.groupAffiliation,
  "Hate Crime": TPP.hateCrime,
  "LEO Informant": TPP.leoInformant,
  "Previous similar crime": TPP.previousSimilarCrime,
  "Criminal method": TPP.criminalMethod,
  "Additional criminal method": TPP.additionalCriminalMethod,
  "Completion of crime": TPP.completionOfCrime,
  "# killed": TPP.numKilled,
  "# injured": TPP.numInjured,
  Charges: TPP.charges,
  Plea: TPP.plea,
  Verdict: TPP.verdict,
  "Length of prison sentence": TPP.lengthOfPrisonSentence,
  "Life sentence": TPP.lifeSentence,
  "Death sentence": TPP.deathSentence,
  "Additional details": TPP.additionalDetails,
  Age: TPP.age,
  Gender: TPP.gender,
  "Other' status": TPP.otherStatus,
  "Racial/ethnic group": TPP.racialOrEthinicGroup,
  Religion: TPP.religion,
  "Veteran status": TPP.veteranStatus,
  "Combat veteran": TPP.combatVeteran,
  "Service Classification": TPP.serviceClassification,
  "Citizenship status": TPP.citizenshipStatus,
  "Short narrative": TPP.shortNarrative,
  "Name of coder(s)": TPP.nameOfCoders,
  "Source description": TPP.sourceDescription,
  Audited: TPP.audited,
  "Date of last review": TPP.dateOfLastReview,
  Ready: TPP.ready,
  Claimed: TPP.clamed,
  Complete: TPP.complete,
  "Questionable Inclusion": TPP.questionableInclusion,
  Tags: TPP.tags,
};

function inverse(obj) {
  var retobj = {};
  for (var key in obj) {
    retobj[obj[key]] = key;
  }
  return retobj;
}

const DisplayNames = inverse(CustomFields);

function parseBool(s) {
    switch (s.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
      case null:
        return false;

      default:
        return undefined;
    }
}

function setTPPDatum(dataset, datum) {
  if (!datum["Case ID"]) return dataset;
  let item = createItem();
  Object.entries(datum).forEach(([key, value]) => {
    if (Dates.includes(key)) {
      const d = value && new Date(value);
      if (d) {
        item = setDate(item, CustomFields[key], d);
      }
    } else if (Bools.includes(key)) {
      const b = value && parseBool(value);
      if (b !== undefined) {
        item = setBoolean(item, CustomFields[key], b);
      }
    } else if (Nums.includes(key)) {
      const n = value && parseInt(value);
      if (n) {
        item = setInteger(item, CustomFields[key], n);
      }
    } else {
      item = setStringNoLocale(item, CustomFields[key], value);
    }
  })
  return setItemWithUUID(dataset, item);
}


const FOUOTtlUrl = "https://tpp.mysilio.me/public/data/FOUO.ttl";
const FOUOCsvUrl= "https://tpp.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20U__FOUO.csv";
await etl(FOUOCsvUrl, FOUOTtlUrl, setTPPDatum);

const PendingTtlUrl = "https://tpp.mysilio.me/public/data/Pending.ttl";
const PendingCsvUrl = "https://tpp.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20Pending%20cases.csv";
await etl(PendingCsvUrl, PendingTtlUrl, setTPPDatum);
