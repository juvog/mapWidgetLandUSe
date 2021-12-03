import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import LandUseChart from "./LandUseChart"

interface LandUseState {
  tabLandUse: VictoryDiagramType[]
}

interface LandUseProps {
  value?: string
}

export class LandUse extends React.Component<LandUseProps, LandUseState> {
  constructor(props: LandUseProps) {
    super(props)
    this.state = {
      tabLandUse: []
    }
  }

  public componentDidMount() {
    console.log("composant mount")
    // populate graph on first mount
    // POur être sur que la carte soit chargée :

    JMap.Layer.setSelectabilityById(0, true)
    if (JMap.Map.isMapLoaded()) {
      console.log("map loaded")
      this.getData()
    } else {
      JMap.Event.Map.on.mapLoad("custom-map-load", () => {
        JMap.Event.Map.remove("custom-map-load")
        this.getData()
      })
    }
    // register map move listener
    JMap.Event.Map.on.moveEnd("custom-map-move", () => {
      this.getData()
    })
  }

  public render() {
    const { tabLandUse } = this.state
    const landUseCategoriesForVictory = new Array<string>()
    const landUseDistForVictory = new Array<VictoryDiagramType>()
    let landUseAmount = 0

    tabLandUse.forEach(t => {
      if (t.y !== 0) {
        const newElement: any = new Object()
        newElement.x = t.x
        newElement.y = t.y
        newElement.couleur = t.couleur
        landUseDistForVictory.push(newElement)
        landUseAmount += t.y
      }
    })

    landUseDistForVictory.forEach(t => {
      landUseCategoriesForVictory.push(t.x)
    })

    return (
      <div>
        <div>Nombre de terrains par zonage </div>
        <div>
          <LandUseChart
            landUseDistForVictory={landUseDistForVictory}
            landUseCategoriesForVictory={landUseCategoriesForVictory}></LandUseChart>
        </div>
      </div>
    )
  }

  private getData() {
    let res = 0
    let ind = 0
    let tra = 0
    let comm = 0
    let ser = 0
    let act = 0
    let pro = 0
    let imm = 0
    const type = "UTILISATIO"
    JMap.Map.getRenderedFeatures(0)
      .map(f => f.properties?.[type] as string)
      .forEach(t => {
        if (t.substring(0, 1) === "1") {
          res++
        } else if (t.substring(0, 1) === "2") {
          ind++
        } else if (t.substring(0, 1) === "3") {
          ind++
        } else if (t.substring(0, 1) === "4") {
          tra++
        } else if (t.substring(0, 1) === "5") {
          comm++
        } else if (t.substring(0, 1) === "6") {
          ser++
        } else if (t.substring(0, 1) === "7") {
          act++
        } else if (t.substring(0, 1) === "8") {
          pro++
        } else if (t.substring(0, 1) === "9") {
          imm++
        }
      })

    this.setState({
      tabLandUse: [
        { x: "tra", y: tra, couleur: "#a99710" },
        { x: "ser", y: ser, couleur: "#477fa5" },
        { x: "res", y: res, couleur: "#ae0ef8" },
        { x: "pro", y: pro, couleur: "#1ffe78" },
        { x: "imm", y: imm, couleur: "#faef22" },
        { x: "ind", y: ind, couleur: "#6F7073" },
        { x: "com", y: comm, couleur: "#a5debc" },
        { x: "act", y: act, couleur: "#e31414" }
      ]
    })
  }
}
