import { input } from '../../../Formula'
import { Data } from '../../../Formula/type'
import { constant, infoMut, percent, prod, greaterEq } from '../../../Formula/utils'
import { ArtifactSetKey } from '../../../Types/consts'
import { customDmgNode } from '../../Characters/dataUtil'
import { ArtifactSheet, IArtifactSheet } from '../ArtifactSheet'
import { dataObjForArtifactSheet } from '../dataUtil'
import icons from './icons'
const key: ArtifactSetKey = "OceanHuedClam"
const set2 = greaterEq(input.artSet.OceanHuedClam, 2, percent(0.15))
const heal = greaterEq(input.artSet.OceanHuedClam, 4,
  customDmgNode(prod(percent(0.9), 30000), "elemental", {
    hit: { ele: constant("physical") }
  })
)

export const data: Data = dataObjForArtifactSheet(key, {
  premod: {
    heal_: set2
  },
}, {
  heal,
})

const sheet: IArtifactSheet = {
  name: "Ocean-Hued Clam", rarity: [4, 5],
  icons,
  setEffects: {
    2: { document: [{ fields: [{ node: set2 }] }] },
    4: {
      document: [{
        fields: [{
          node: infoMut(heal, { key: `artifact_${key}:condName`, variant: "physical" })
        }]
      }]
    }
  }
}
export default new ArtifactSheet(key, sheet, data)
