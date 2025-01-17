import { WeaponData } from 'pipeline'
import { input } from '../../../../Formula'
import { equal, subscript } from '../../../../Formula/utils'
import { WeaponKey } from '../../../../Types/consts'
import { cond, trans } from '../../../SheetUtil'
import { dataObjForWeaponSheet } from '../../util'
import WeaponSheet, { conditionalHeader, IWeaponSheet } from '../../WeaponSheet'
import iconAwaken from './AwakenIcon.png'
import data_gen_json from './data_gen.json'
import icon from './Icon.png'

const key: WeaponKey = "TheAlleyFlash"
const data_gen = data_gen_json as WeaponData
const [tr, trm] = trans("weapon", key)

const [condPassivePath, condPassive] = cond(key, "ItinerantHero")
const bonusInc = [0.12, 0.15, 0.18, 0.21, 0.24]
const all_dmg_ = equal(condPassive, 'on', subscript(input.weapon.refineIndex, bonusInc, { key: "_" }))

const data = dataObjForWeaponSheet(key, data_gen, {
  premod: {
    all_dmg_
  },
})
const sheet: IWeaponSheet = {
  icon,
  iconAwaken,
  document: [{
    conditional: {
      value: condPassive,
      path: condPassivePath,
      header: conditionalHeader(tr, icon, iconAwaken),
      name: trm("condName"),
      states: {
        on: {
          fields: [{
            node: all_dmg_
          }]
        }
      }
    }
  }],
}
export default new WeaponSheet(key, sheet, data_gen, data)
