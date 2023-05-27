export const CODEBOOK = {
    "Date":"What date did the incident occur?",
    "Date descriptor":"What stage in the prosecution does this date describe?",
    "Case ID":"The 8-digit M/D/Y value + the defendant's initials (e.g., 01011998_AA for a defendant indicted on January 1, 1998 with the name Amy Arsonist).",
    "Group identifier":"Did the defendant's case involve other co-offenders, co-conspirators, or co-defendants? I.e., Did the members intentionally work together to commit the crime?",
    "Full legal name":"(e.g., John Evan Smith Jr.)",
    "First name":"All parts of defendant's name excluding the family name (e.g., John Evan Jr.).",
    "Family name":"The defendant's surname (e.g., Smith).",
    "Other names/aliases":"Is the defendant identified through any other names in the court records or other secondary sources (e.g., Johnny McFacist)?",
    "Co-offender":"Does the defendant have any co-offenders, co-conspirators, or co-defendants?",
    "Reason for inclusion":"Which of the criteria for inclusion does the case meet?",
    "Name of case":"What is the name of the court case?",
    "Jurisdiction":"Under which jurisdiction was the case prosecuted?",
    "Location: country":"In which country did the crime occur?",
    "Location: state":"In which US state did the crime occur?",
    "Location: city":"In which city did the crime occur?",
    "People vs. property":"Did this crime intend to target human beings, material property, both, or neither?",
    "Physical target":"What was the function of the physical target of the crime?",
    "Ideological target":"What characteristics of the target made it appealing to the defendant?",
    "Ideological affiliation":"What belief system, if any, motivated the defendant to commit the crime?",
    "Affiliation with FTO":"Was the defendant affiliated with a Foreign Terrorist Organization as identified by the United States Department of State at the time of indictment?",
    "Group affiliation":"With what group, if any, did the defendant have a known connection at the time of the crime?",
    "Hate crime":"Was the crime designated as a hate crime or as being motivated by bias?",
    "LEO informant":"Did the case involve law enforcement (e.g., FBI's undercover federal agent) misrepresenting themselves to defendants as co conspirators, or non-law enforcement officers (i.e., civilians) who were tasked and paid by law enforcement?",
    "Previous similar method":"Has the defendant been charged or convicted of a previous crime motivated by the same belief system?",
    "Criminal method":"Through what means did the defendant carry out their crime?",
    "Additional criminal method":"Through what additional means, if any, did the defendant carry out their crime?",
    "Completion of crime":"To what extent was the crime the defendant intended carried through?",
    "# killed":"How many people, if any, were killed as a result of the crime? (includes all deaths, both purposeful and accidental, as well as the perpetrator themself).",
    "# injured":"How many people, if any, were injured as a result of the crime? (includes all injuries, both purposeful and accidental, as well as the perpetrator themself).",
    "Charges":"What criminal charges were brought against the defendant?",
    "Plea":"How did the defendant plead to the charges?",
    "Verdict":"What was the final verdict of the criminal case?",
    "Length of prison sentence (months)":"How many months was the defendant sentenced to serve in prison?",
    "Life sentence":"How many life sentences did the defendant receive?",
    "Death sentence":"How many death sentences did the defendant receive?",
    "Additional details":"What notable, additional, or atypical charges or conditions were associated with the defendant in order of importance?",
    "Age":"How old was the defendant at the time of indictment?",
    "Gender":"What was the defendant's gender at the time of indictment?",
    "Other status":"Given the standards of an 'average American jury' in terms of (perceived or actual) ethnicity, religion and/or citizenship, is the defendant understood to be different from 'an average American'?",
    "Racial/ethnic group":"What is the defendant's race/ethnicity?",
    "Religion":"What religion, if any, did the defendant associate with at the time of indictment, and if that is unavailable, the time of the crime?",
    "Veteran status":"Does the defendant have prior military experience (recognized by the United States), and if so, what is their status?",
    "Combat veteran":"If the defendant is a veteran, did they fight in a war or extended armed conflict?",
    "Service classification":"What branch of the military did the individual serve in? Did they serve as a police officer?",
    "Citizenship status":"What citizenship status does the defendant hold in the US?",
    "Short narrative":"Short narrative of the case which provides the reader with enough information that they can understand why the case is included, what transpired, and the basic facts of the defendant's prosecution."
}

export const CODEBOOK_SORTING = [
    "Table View",
    "A-Z"
]

class CodebookEntry {
    constructor(description, examples) {
        this.description = description;
        this.examples = examples;
    }
}