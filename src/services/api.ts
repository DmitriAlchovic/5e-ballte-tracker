import {
  ApiCharacter,
  Character,
  ApiAction,
  ApiSpecialAbility,
  ApiSpellcasting,
} from "../interfaces";

class Service {
  _apiBase = "https://www.dnd5eapi.co/api/";

  async getResource(url: string) {
    const res: Response = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error("Could not fetch" + `${res.status}`);
    }

    return await res.json();
  }

  async getMonstersList() {
    const res = await this.getResource(`/monsters/`);
    return res.results;
  }
  /* async getMonstersList() {
    const res= await axios.get(`${this._apiBase}/monsters/`) 
   console.log(res.data.results.results);
    
    return await (res);
} */
  async getMonster(index: string) {
    const monster = await this.getResource(`/monsters/${index}`);
    return this._transfomCharInfo(monster);
  }

  _transfomCharInfo(char: any) {

    const actions = char.actions.map((ApiAction: ApiAction) => {
      const damageArr = ApiAction.damage.map(
        ({ damage_type: damageType, damage_dice: damageDice }) => {
          return { damageType, damageDice };
        }
      );
      const { attack_bonus: attackBonus, ...newAction } = ApiAction;
      return { ...newAction, attackBonus, damage: damageArr };
    });

    const specialAbilites = char.special_abilities.map(
      ({ spellcasting, ...ability }: ApiSpecialAbility) => {
        if (spellcasting) {
          const {
            components_required: componentsRequired,
            ...spellcastingChanged
          } = spellcasting;
          const newSpellcasting = {
            ...spellcastingChanged,
            componentsRequired,
          };
          return { ...ability, spellcasting: newSpellcasting };
        } else return ability;
      }
    );
    const { senses:sensesChange } = char;
    const {passive_perception:passivePerception,...newSenses} = sensesChange;
     const senses = {...newSenses, passivePerception} ;
    const {
      armor_class: armorClass,
      challenge_rating: challengeRaiting,
      condition_immunities: conditionImmunitiesk,
      damage_immunities: damageImmunities,
      damage_resistances: damageResistances,
      damage_vulnerabilities: damageVulnerabilities,
      hit_dice: hitDice,
      hit_points: hitPoints,
      legendary_actions:legendaryActions,
      special_abilities,
      ...newChar
    } = char;

    return {
      ...newChar,
      actions: actions,
      armorClass,
      challengeRaiting,
      conditionImmunitiesk,
      damageImmunities,
      damageResistances,
      damageVulnerabilities,
      hitDice,
      hitPoints,
      legendaryActions,
      specialAbilites,
      senses:senses
    };
  }
}
export default new Service();
