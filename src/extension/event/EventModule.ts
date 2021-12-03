import { JEventFunction, JEventListener, JEventModule } from "jmap-core"

export abstract class EventModule implements JEventModule {
  public on = {}
  private inactiveListenerIds: string[] = []
  private listenersByEventId: { [eventId: string]: JEventListener[] } = {}

  public notify(eventId: string, params?: object): void {
    let listeners: JEventListener[] = this.listenersByEventId[eventId]
    if (!listeners) {
      return
    } else {
      listeners = listeners.slice()
    }
    for (const listener of listeners) {
      try {
        if (this.inactiveListenerIds.indexOf(listener.id) !== -1) {
          continue
        }
        listener.fn(params)
      } catch (ex) {
        console.error(`Error event="${eventId}", listener="${listener.id}".`, ex)
      }
    }
  }

  public existById(listenerId: string): boolean {
    if (this.inactiveListenerIds.indexOf(listenerId) !== -1) {
      return true
    }
    const listenerCollections: JEventListener[][] = Object.values(this.listenersByEventId)
    for (const listeners of listenerCollections) {
      if (listeners.findIndexByProperty("id", listenerId) !== -1) {
        return true
      }
    }
    return false
  }

  public activate(listenerId: string): void {
    this.inactiveListenerIds.remove(listenerId)
  }

  public deactivate(listenerId: string): void {
    if (this.inactiveListenerIds.indexOf(listenerId) === -1) {
      this.inactiveListenerIds.push(listenerId)
    }
  }

  public remove(listenerId: string): void {
    const listenerCollections: JEventListener[][] = Object.values(this.listenersByEventId)
    for (const listeners of listenerCollections) {
      listeners.removeByProperty("id", listenerId)
    }
    this.inactiveListenerIds.remove(listenerId)
  }

  protected addListenerFn(eventId: string, listenerId: string, fn: JEventFunction): void {
    let listeners: JEventListener[] = this.listenersByEventId[eventId]
    if (!listeners) {
      listeners = []
      this.listenersByEventId[eventId] = listeners
    }
    if (!listenerId || typeof listenerId !== "string") {
      throw Error("Invalid listenerId parameter")
    }
    const listenerIndex = listeners.findIndexByProperty("id", listenerId)
    if (listenerIndex === -1) {
      listeners.push({
        id: listenerId,
        fn
      })
    } else {
      // replace existing listener
      listeners.splice(listenerIndex, 1, {
        id: listenerId,
        fn
      })
    }
  }
}
