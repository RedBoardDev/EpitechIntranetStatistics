import { epitechData } from '../data/epitech_data.js';

class EpitechData {
  #data;

  constructor() {
    this.#data = epitechData;
  }

  getUpdateDate() {
    return this.#data?.update_date ?? '1942-04-02';
  }

  getRoadblocksNames() {
    return this.#data?.roadblocks_name ?? null;
  }

  getRoadblocksNameByType(type) {
    return this.#data?.roadblocks_name?.[type] ?? null;
  }

  getRoadblocksRequirements(schoolyear) {
    const yearKey = `pge${schoolyear}`;
    return this.#data?.promo_requirements?.[yearKey]?.roadblocks ?? null;
  }

  getRoadblocksRequirementsByType(schoolyear, type) {
    const yearKey = `pge${schoolyear}`;
    return this.#data?.promo_requirements?.[yearKey]?.roadblocks?.[type] ?? null;
  }

  getUnits(schoolyear) {
    const yearKey = `pge${schoolyear}`;
    return this.#data?.promo_requirements?.[yearKey]?.units ?? null;
  }

  getUnitsByType(schoolyear, type) {
    const yearKey = `pge${schoolyear}`;
    return this.#data?.promo_requirements?.[yearKey]?.units?.[type] ?? null;
  }

  getCreditsRequirements(schoolyear) {
    const yearKey = `pge${schoolyear}`;
    return this.#data?.promo_requirements?.[yearKey]?.roadblocks?.total_credits ?? 0;
  }

  getHubUnit() {
    return this.#data?.hub?.unit ?? null;
  }

  getHubMaxCredits(schoolyear) {
    const yearKey = `pge${schoolyear}`;
    return this.#data?.hub?.max_credits?.[yearKey] ?? 0;
  }

  getHubActivities() {
    return this.#data?.hub?.activities ?? null;
  }

  getHubActivitiesByType(type) {
    const activities = this.#data?.hub?.activities;

    if (!activities) return null;
    const matchingActivity = activities.find(activity => {
      return activity.name === type || (activity.alias && activity.alias.includes(type));
    });

    return matchingActivity || null;
  }
}

export { EpitechData };
