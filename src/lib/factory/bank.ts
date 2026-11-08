/**
 * RR-401 · the factory items, as the importer wrote them (src/content/factory/fr-factory-items.json).
 *
 * THESE ARE NOT PART OF THE SEED BANK. The build's seed (scripts/seed/append.ts, run by `npm run build` as `seed:prod`)
 * INSERTS only the bank in scripts/seed/*.ts; it never inserts these. They reach the database only when the owner runs
 * scripts/factory/seed-fr-factory.ts. append.ts reads FACTORY_KEYS for one reason: once the owner has seeded them, the
 * build's reconcile phase must not deactivate them as "absent from the bank", and its verify phase must count them.
 */
import data from "../../content/factory/fr-factory-items.json";
import { itemKey, type FactoryData } from "./import";

export const FACTORY_DATA = data as unknown as FactoryData;
export const FACTORY_ITEMS = FACTORY_DATA.items;
/** (level|skill|title) of every factory item: append.ts's own key */
export const FACTORY_KEYS = new Set(FACTORY_ITEMS.map((i) => itemKey(i)));
