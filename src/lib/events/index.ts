import { EventProvider } from "./event.provider";

const startEventProvider = () => {
    const eventProvider = new EventProvider();

    return eventProvider;
}

export { startEventProvider }
