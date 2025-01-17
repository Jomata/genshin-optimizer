import { Box, CardContent, Typography } from "@mui/material"
import CardDark from "../Card/CardDark"
import DocumentDisplay from "../DocumentDisplay"
import SqBadge from "../SqBadge"
import usePromise from "../../ReactHooks/usePromise"
import { ArtifactSetKey, SetNum } from "../../Types/consts"
import { ArtifactSheet } from "../../Data/Artifacts/ArtifactSheet"

type Data = {
  setKey: ArtifactSetKey,
  setNumKey: SetNum
}

export default function SetEffectDisplay({ setKey, setNumKey }: Data) {
  const sheet = usePromise(ArtifactSheet.get(setKey), [setKey])
  if (!sheet) return null

  const setEffectText = sheet.setEffectDesc(setNumKey)
  const document = sheet.setEffectDocument(setNumKey)
  return <Box display="flex" flexDirection="column" gap={1}>
    <CardDark>
      <CardContent>
        <Typography><SqBadge color="success">{setNumKey}-Set</SqBadge> {setEffectText}</Typography>
      </CardContent>
    </CardDark>
    {document ? <DocumentDisplay sections={document} /> : null}
  </Box>
}
