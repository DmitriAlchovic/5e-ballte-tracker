export interface CreateFightProps {
  inputName: string;
  value: number | string;
  inputType: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
}

export interface ApiCharacter {
  actions: ApiAction[];
  alignment: string;
  armor_class: number;
  challenge_rating: number;
  charisma: number;
  condition_immunities: ConditionImmunity[];
  constitution: number;
  damage_immunities: string[];
  damage_resistances: string[];
  damage_vulnerabilities: string[];
  dexterity: number;
  hit_dice: string;
  hit_points: number;
  index: string;
  intelligence: number;
  initiative: number;
  languages: string;
  legendary_actions: LegendaryAction[];
  name: string;
  proficiencies: Proficiencies[];
  senses: ApiSenses;
  size: string;
  special_abilities?: ApiSpecialAbility[];
  speed: Speed;
  strength: number;
  subtype: null | string;
  type: string;
  url: string;
  wisdom: number;
  xp: number;
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
  damageImmunities: string[];
  damageResistances: string[];
  damageVulnerabilities: string[];
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
  xp: number;
  characterType: 'npc';
  id: string;
  isFriendly?:boolean;
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
  lists: any;
}

export interface InputCardProps {
  enemy: boolean;
  id: string;
}

export interface BattleCardProps {
  npc: Character;
  statusChange: Function;
  fightCharStatus:FightCharStatus;
  roundCounter:number;
}

export interface PlayerCharacter {
  characterName: string;
  playerName: string;
  armorClass: number;
  maxHitpoints: number;
  hitPoints: number;
  speed: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  passivePreception: number;
  darkvision: boolean;
  languages: string;
  discription: string;
  initiative?: any;
  characterType: 'playerCharacter';
  id: string;
  level:number;
}

export interface Party {
  partyName: string;
  partyMembers: PlayerCharacter[];
}

export interface SelectTabProps {
  activeParties: Party[];
  addParty: Function;
  submitCharacters: Function;
  editParty: Function;
  deleteParty: Function;
}

export interface CharacterInputCardProps {
  addOrEditPartyMember: Function;
  characterToEdit?: PlayerCharacter;
}

export interface CharacterInfoCardProps {
  partyMembers: PlayerCharacter[];
}

export interface NpcInfoCardProps {
  selectedCharacter: Character;
}

export interface NpcListCardProps {
  npcArray: Character[];
  deleteHandler: Function;
  hasSwitch?:boolean;
  toggleFriendly:Function;
}

export interface FightPageProps {
  partyArray: PlayerCharacter[];
  npcArray: Character[];
  initiativeList: InitiativeList | undefined;
}

export interface InitiativeList {
  [id: string]: number;
}

export interface BattleTabProps {
  fightArray: Character[] | PlayerCharacter[];
  fightCharStatus?: FightCharStatus;
  statusChangeHandler:Function;
  changeRound:Function;
  roundCounter:number;
}

export interface BattleCharacterCardProps {
  playerCharacter: PlayerCharacter;
  fightCharStatus:FightCharStatus;
  statusChange:Function;
}

export interface FightCharStatus {
  [id: string]: {
    hitPoints: number;
    Blinded: false;
    Charmed: false;
    Deafened: false;
    Frightened: false;
    Grappled: false;
    Incapacitated: false;
    Invisible: false;
    Paralyzed: false;
    Petrified: false;
    Poisoned: false;
    Prone: false;
    Restrained: false;
    Stunned: false;
    Unconscious: false;
    Exhaustion: string;
    ConcentratedOnSpell:false;
  };
}

export interface ApiSpell {
  _id:string;
  attack_type:string;
  casting_time:string;
  classes:string[];
  components:string[];
  concentration:boolean;
  damage:{
    damage_slot_level:{[key:number]:string};
    damage_type:DamageType;
  }
  desc:string[];
  duration:string;
  higher_level:string[];
  index:string;
  level:number;
  material:string;
  name:string;
  range:string;
  ritual:boolean;
  school:MagicSchool;
  subclasses:Subcalsses[];
  url:string;
}

export interface MagicSchool {
  index:string;
  name:string;
  url:string;
}

export interface Subcalsses {
  index:string;
  name:string;
  url:string;
}

export interface SpellInfoCardProps{
  spellUrl:string;
}

export interface SpellInfo {
  _id:string;
  attackType:string;
  castingTime:string;
  classes:string[];
  components:string[];
  concentration:boolean;
  damage:Damage;
  desc:string[];
  duration:string;
  higherLevel:string[];
  index:string;
  level:number;
  material:string;
  name:string;
  range:string;
  ritual:boolean;
  school:MagicSchool;
  subclasses:Subcalsses[];
  url:string;
}

export interface DifficultyInfoProps {
  currentParty:PlayerCharacter[];
  npcList:Character[];
}

export interface ConditionsInfoProps {
  id:string;
  fightCharStatus:FightCharStatus;
  statusChange:Function;
}