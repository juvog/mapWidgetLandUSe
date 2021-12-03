import { Chip } from "@material-ui/core"
import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import { VictoryBar, VictoryChart } from "victory"

export interface LandUseChartProps {
  landUseDistForVictory: VictoryDiagramType[]
  landUseCategoriesForVictory: string[]
}

const getName = (name: string): string => {
  let fullName = ""
  if (name === "res") {
    fullName = "Résidentiel"
  }
  if (name === "ind") {
    fullName = "Industrie manufacturière"
  }
  if (name === "tra") {
    fullName = "Transports, communication et services publics"
  }
  if (name === "com") {
    fullName = "Commercial"
  }
  if (name === "ser") {
    fullName = "Services"
  }
  if (name === "act") {
    fullName = "Activités culturelles récréatives et loisirs"
  }
  if (name === "pro") {
    fullName = "Production et extraction de richesses naturelles"
  }
  if (name === "imm") {
    fullName = "Immeubles non exploités et étendues d'eau"
  }
  return fullName
}

const LandUseChart = (props: LandUseChartProps) => {
  return (
    <div>
      <VictoryChart domainPadding={25}>
        <VictoryBar
          data={props.landUseDistForVictory}
          horizontal
          // for a unique color
          // style={{ data: { fill: "#c43a31" } }}
          // for color that depends of the value of the attributes

          categories={{
            x: props.landUseCategoriesForVictory
          }}
          labels={({ datum }) => `${datum.y}`}
          style={{
            data: { fill: d => d.datum.couleur }
          }}
          // labelComponent={
          //   <VictoryTooltip
          //     style={{ fontSize: "18" }}
          //     // flyoutWidth={160}
          //     // // flyoutHeight={50}
          //     // flyoutStyle={{ stroke: "#c43a31", strokeWidth: 2 }}
          //   />
          // }
          events={[
            {
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      target: "labels",
                      mutation: props => {
                        const category = props.datum.x
                        const nb = props.datum.y
                        const container = document.getElementById("onMouseOverData")
                        container!.innerHTML = getName(category) + " : " + nb
                        return { style: { fill: "tomato", fontSize: 16 }, text: nb }
                        // return { text: nb }
                      }
                    }
                  ]
                },
                onMouseOut: () => {
                  return [
                    {
                      target: "labels",
                      mutation: () => {
                        const container = document.getElementById("onMouseOverData")
                        container!.innerHTML = ""
                        return null
                      }
                    }
                  ]
                }
              }
            }
          ]}
        />
      </VictoryChart>
      <h3 id="onMouseOverData" style={{ fontSize: 15, color: "red", fontWeight: "normal" }}>
        <br></br>
      </h3>

      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#e31414", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Activités culturelles récréatives et loisirs (act)
      </div>
      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#a5debc", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Commercial (com)
      </div>
      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#faef22", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Immeubles non exploités et étendues d'eau (imm)
      </div>
      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#6F7073", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Industrie manufacturière (ind)
      </div>
      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#1ffe78", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Production et extraction de richesses naturelles (pro)
      </div>
      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#ae0ef8", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Résidentiel (res)
      </div>
      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#477fa5", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Services (ser)
      </div>

      <div>
        <Chip
          size={"small"}
          style={{ backgroundColor: "#a99710", paddingTop: 0, paddingBottom: 0, width: "1rem", height: "1rem" }}
        />
        Transports, communication et services publics (tra)
      </div>
    </div>
  )
}

export default LandUseChart
