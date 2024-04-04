/* eslint-disable @typescript-eslint/naming-convention */

import type { DependencyContainer } from "tsyringe";
import { InstanceManager } from "./InstanceManager";

import type { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import type { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { IWeatherConfig } from "@spt-aki/models/spt/config/IWeatherConfig";

class WinterMode implements IPostDBLoadMod, IPreAkiLoadMod 
{
    private Instance: InstanceManager = new InstanceManager();
    private modName = "WinterMode";

    public preAkiLoad(container: DependencyContainer): void 
    {
        this.Instance.preAkiLoad(container, this.modName);
    }

    public postDBLoad(container: DependencyContainer): void 
    {
        this.Instance.postDBLoad(container);

        const weatherConfig: IWeatherConfig = this.Instance.configServer.getConfig(ConfigTypes.WEATHER)
        weatherConfig.forceWinterEvent = true;

        this.Instance.logger.log("Winter mode enabled.", LogTextColor.BLUE);
    }
}

module.exports = { mod: new WinterMode() }