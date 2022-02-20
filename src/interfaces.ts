import { NumberLiteralType } from "typescript";


export interface CreateFightProps {
    inputName:string;
    value:number|string;
    inputType:string;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    id:string;

  }

  export interface ApiCharacter{
    actions:ApiAction[]
    armor_class:number;
    challenge_rating:number;
    condition_immunities:ConditionImmunity[];
    damage_immunitues:string[];
    damage_resistances:string[];
    damage_vulnerabilities:string[];
    hit_dice:string;
    hit_points:string;
    legendary_actions:LegendaryAction[];
    special_abilities:ApiSpecialAbility[];
    senses:ApiSenses;
    
  }
    export interface ApiAction{
    damage:ApiDamage[];
    attack_bonus:number;
  }

  interface ApiDamage{
    damage_dice:string;
    damage_type:DamageType;
  }

  interface ApiSenses{
    passive_perception:number;
  }

  export interface ApiSpecialAbility{
    spellcasting:ApiSpellcasting|undefined;
  }

  export interface ApiSpellcasting{
    components_required:string[];
  }

  export interface Character {
    actions:Action[];
    alignment:string;
    armorClass:number;
    challengeRating:number;
    charisma:number;
    conditionImmunities:ConditionImmunity[];
    constitution:number;
    damageImmunities:string[];
    damageResistances:string[];
    damageVulnerabilities:string[];
    dexterty:number;
    hitDice:string;
    hitPoints:string;
    index:string;
    intelegence:number;
    initiative:number;
    languages:string;
    legendaryActions:LegendaryAction[];
    name:string;
    proficiences:Proficiency[];
    senses:Senses;
    size:string;
    specialAbilities:SpecialAbility[];
    speed:Speed;
    strength:number;
    subtype:null|string;
    type:string;
    url:string;
    wisdom:number;
    xp:number;
  }

  export interface Action {
    attackBonus:number;
    damage:Damage[];
    desc:string;
    name:string;
    options:Action[];
  }

  export interface Damage {
    damageDice:string;
    damageType:DamageType;
  }

  export interface DamageType{
    index:string;
    name:string;
    url:string;
  }

  export interface ConditionImmunity{
    index:string;
    name:string;
    url:string;
  }

  export interface LegendaryAction{
    name:string;
    desc:string;
  }

  export interface Proficiences{
    proficiency:Proficiency;
    value:number
  }

  export interface Proficiency {
    index:string;
    name:string;
    url:string;
  }

  export interface Senses{
    blindsight:string;
    darkvision:string;
    passivePerception:number;
  }

  export interface SpecialAbility {
    desc:string;
    name:string;
    usage:Usage;
    spellcasting:Spellcasting;
  }
  
  export interface Usage {
    type:string;
    times:number;
  }
  
  export interface Spellcasting {
    ability:Ability;
    componentsRequired:string[];
    dc:number;
    level:number;
    modifier:number;
    school:string;
    slots:Slots;
    spells:Spell[];
  }

  export interface Ability {
    index:string;
    name:string;
    url:string;
  }

  export interface Slots {
    1:number;
    2:number;
    3:number;
    4:number;
    5:number;
    6:number;
    7:number;
    8:number;
    9:number;
  }

  export interface Spell {
    level:number;
    name:string;
    url:string;
  }

  export interface Speed {
    fly:string;
    swim:string;
    walk:string;
  }
