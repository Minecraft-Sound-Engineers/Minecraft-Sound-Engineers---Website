package com.isakgrönlund.minecraftsoundengineers;

import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(minecraftsoundengineers.MODID)
public class YourMod {
    public static final String MODID = "yourmodid";
    private static final Logger LOGGER = LogManager.getLogger();

    public YourMod() {
        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::setup);
        bus.addListener(this::doClientStuff);
    }

    private void setup(final FMLCommonSetupEvent event) {
        // Pre-initialization code
        LOGGER.info("Setup method registered.");
    }

    private void doClientStuff(final FMLClientSetupEvent event) {
        // Client-side initialization code
        LOGGER.info("Client setup method registered.");
    }
}
