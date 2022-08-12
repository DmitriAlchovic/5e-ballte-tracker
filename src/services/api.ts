import {
  ApiCharacter,
  Character,
  ApiAction,
  ApiSpecialAbility,
  Action,
  SpecialAbility,
  Damage,
  ApiSpell,
} from "../interfaces";

class Service {
  _apiBase = "https://www.dnd5eapi.co";

  async getResource(url: string) {
    const res: Response = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${res.status}`);
    }
    return await (res.json());
  }

  async getMonstersList() {
    const res = await this.getResource(`/api/monsters/`);
    return res.results;
  }
  
  async getMonster(index: string) {
    const monster = await this.getResource(`/api/monsters/${index}`);
    return this._transfomCharInfo(monster);
  }

  async getItem(url:string){
    const  spell = await this.getResource(url);
    return await this._transformSpellInfo(spell);
  }

  findSpecialAbilities(
    abilitiesArray: ApiSpecialAbility[] | undefined
  ): SpecialAbility[] | undefined {
    let specialAbilities = undefined;
    if (abilitiesArray) {
      specialAbilities = abilitiesArray.map(
        (SpecialAbility: ApiSpecialAbility): SpecialAbility => {
          const { spellcasting, ...newSpecialAbility } = SpecialAbility;
          if (spellcasting) {
            const {
              components_required: componentsRequired,
              ...spellcastingChanged
            } = spellcasting;
            const newSpellcasting = {
              ...spellcastingChanged,
              componentsRequired,
            };
            return { ...SpecialAbility, spellcasting: newSpellcasting };
          } else return { ...newSpecialAbility };
        }
      );
    } else {
      specialAbilities = undefined;
    }

    return specialAbilities;
  }

  findActions(actions: ApiAction[]): Action[] {
    const action = actions.map((ApiAction: ApiAction):any => {
      if(ApiAction.damage){
      const damageArr = ApiAction.damage.map(
        ({ damage_type: damageType, damage_dice: damageDice }): Damage|undefined => {
          return { damageType, damageDice };
        }
      );
      if (ApiAction.attack_bonus) {
        const { attack_bonus: attackBonus, ...newAction } = ApiAction;

        return { ...newAction, attackBonus, damage: damageArr };
      } else return { ...ApiAction, damage: damageArr };
    }
    else return {...ApiAction}
    });
    return action;
  }
  _transformSpellInfo(spell:ApiSpell) {
    return{spell}
  }
  _transfomCharInfo(char: ApiCharacter): Character {
    const actions = this.findActions(char.actions);

    const specialAbilities = this.findSpecialAbilities(char.special_abilities);

    const { senses: sensesChange } = char;
    const { passive_perception: passivePerception, ...newSenses } =
      sensesChange;
    const senses = { ...newSenses, passivePerception };
    const {
      armor_class: armorClass,
      challenge_rating: challengeRaiting,
      condition_immunities: conditionImmunities,
      damage_immunities: damageImmunities,
      damage_resistances: damageResistances,
      damage_vulnerabilities: damageVulnerabilities,
      hit_dice: hitDice,
      hit_points: hitPoints,
      legendary_actions: legendaryActions,
      special_abilities,
      ...newChar
    }: ApiCharacter = char;

    return {
      ...newChar,
      actions: actions,
      armorClass,
      challengeRaiting,
      conditionImmunities,
      damageImmunities,
      damageResistances,
      damageVulnerabilities,
      hitDice,
      hitPoints,
      legendaryActions,
      specialAbilities,
      senses: senses,
      characterType:'npc',
      id:''
    };
  }
}
export default new Service();
