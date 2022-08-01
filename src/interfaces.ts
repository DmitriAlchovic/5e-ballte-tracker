
export interface CreateFightProps {
  inputName: string;
  value: number | string;
  inputType: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
}

export interface ApiCharacter {
  actions: ApiAction[];
  alignment:string;
  armor_class: number;
  challenge_rating: number;
  charisma:number;
  condition_immunities: ConditionImmunity[];
  constitution:number;
  damage_immunities: string[];
  damage_resistances: string[];
  damage_vulnerabilities: string[];
  dexterity:number;
  hit_dice: string;
  hit_points: number;
  index:string;
  intelligence:number;
  initiative:number;
  languages:string;
  legendary_actions: LegendaryAction[];
  name:string;
  proficiencies:Proficiencies[];
  senses: ApiSenses;
  size:string;
  special_abilities?: ApiSpecialAbility[];
  speed:Speed;
  strength:number;
  subtype:null|string;
  type:string;
  url:string;
  wisdom:number;
  xp:number;
}

export interface Monster {
  index: string;
  name: string;
}

export interface ApiAction {
  damage?: ApiDamage[];
  attack_bonus?: number;
}

interface ApiDamage {
  damage_dice: string;
  damage_type: DamageType;
}

interface ApiSenses {
  passive_perception: number;
}

export interface ApiSpecialAbility {
  desc?: string;
  name?: string;
  spellcasting?: ApiSpellcasting;
}

export interface ApiSpellcasting {
  ability: Ability;
  components_required: string[];
  dc: number;
  level: number;
  modifier: number;
  school: string;
  slots: Slots;
  spells: Spell[];
}

export interface Character {
  actions?: Action[];
  alignment?: string;
  armorClass?: number;
  challengeRaiting?: number;
  charisma?: number;
  conditionImmunities?: ConditionImmunity[];
  constitution?: number;
  damageImmunities?: string[];
  damageResistances?: string[];
  damageVulnerabilities?: string[];
  dexterity: number;
  hitDice?: string;
  hitPoints: number;
  index?: string;
  intelligence?: number;
  initiative: number;
  languages?: string;
  legendaryActions?: LegendaryAction[] | null;
  name: string;
  proficiencies?: Proficiencies[];
  senses?: Senses;
  size?: string;
  specialAbilities?: SpecialAbility[];
  speed?: Speed;
  strength?: number;
  subtype?: null | string;
  type?: string;
  url?: string;
  wisdom?: number;
  xp?: number;
  characterType:"npc";
}

export interface Action {
  attackBonus?: number;
  damage?: Damage[];
  desc?: string;
  name?: string;
  options?: Action[];
}

export interface Damage {
  damageDice: string;
  damageType: DamageType;
}

export interface DamageType {
  index: string;
  name: string;
  url: string;
}

export interface ConditionImmunity {
  index: string;
  name: string;
  url: string;
}

export interface LegendaryAction {
  name: string;
  desc: string;
}

export interface Proficiencies {
  proficiency: Proficiency;
  value: number;
}

export interface Proficiency {
  index: string;
  name: string;
  url: string;
}

export interface Senses {
  blindsight?: string;
  darkvision?: string;
  passivePerception: number;
}

export interface SpecialAbility {
  desc?: string;
  name?: string;
  usage?: Usage;
  spellcasting?: Spellcasting;
}

export interface Usage {
  type: string;
  times: number;
}

export interface Spellcasting {
  ability: Ability;
  componentsRequired: string[];
  dc: number;
  level: number;
  modifier: number;
  school: string;
  slots: Slots;
  spells: Spell[];
}

export interface Ability {
  index: string;
  name: string;
  url: string;
}

export interface Slots {
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
  7?: number;
  8?: number;
  9?: number;
}

export interface Spell {
  level: number;
  name: string;
  url: string;
}

export interface Speed {
  fly?: string;
  swim?: string;
  walk?: string;
}

export interface SearchProps {
  changeHandler: Function;
  value: string;
  lists:any;
}

export interface InputCardProps {
  enemy: boolean;
  id: string;
}

export interface BattleCardProps {
  npc: Character;
  hitpointsChange: Function;
}

export interface PlayerCharacter {
  characterName:string;
  playerName:string;
  armorClass:number;
  maxHitpoints:number;
  currentHitpoints:number;
  speed:number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  passivePreception:number;
  darkvision:boolean;
  languages:string;
  discription:string; 
  initiative?:any;
  characterType:'playerCharacter'
  id?:string;
}

export interface Party {
  partyName:string;
  partyMembers:PlayerCharacter[];
}

export interface SelectTabProps {
  activeParties:Party[];
  addParty:Function;
  submitCharacters:Function;
  editParty:Function;
}

export interface CharacterInputCardProps {
  addOrEditPartyMember:Function;
  characterToEdit?:PlayerCharacter;
}

export interface CharacterInfoCardProps {
  partyMembers:PlayerCharacter[];
}

export interface NpcInfoCardProps {
  selectedCharacter:Character;
}

export interface NpcListCardProps {
  npcArray:Character[];
}

export interface FightPageProps {
  partyArray:PlayerCharacter[];
  npcArray:Character[];
  initiativeList:InitiativeList|undefined;
}

export interface InitiativeList{
    [key: string]:  number;
  }

  export interface BattleTabProps {
    fightArray:Character[]|PlayerCharacter[];
  }

  export interface BattleCharacterCardProps {
    playerCharacter:PlayerCharacter;
  }