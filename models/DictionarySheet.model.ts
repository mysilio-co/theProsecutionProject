class DictionaryItem {
  name: string;
  description: string;
}

export class TagName extends DictionaryItem {}
export class GroupAffiliation extends DictionaryItem {}
export class DictionarySheet {
  tags: TagName[];
  groupAffiliations: GroupAffiliation[];
}
