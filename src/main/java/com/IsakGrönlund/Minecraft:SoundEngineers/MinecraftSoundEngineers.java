package com.isakgrönlund.minecraftsoundengineers;

import com.isakgrönlund.minecraftsoundengineers.blocks.CustomBlock;
import net.minecraft.block.Block;
import net.minecraft.item.BlockItem;
import net.minecraft.item.Item;
import net.minecraft.item.ItemGroup;
import net.minecraftforge.event.RegistryEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.ObjectHolder;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(minecraftsoundengineers.MODID)
public class YourMod {
    public static final String MODID = "yourmodid";
    private static final Logger LOGGER = LogManager.getLogger();
    public static final DeferredRegister<Block> BLOCKS = DeferredRegister.create(ForgeRegistries.BLOCKS, MODID);
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, MODID);

    public YourMod() {
        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::setup);
        bus.addListener(this::doClientStuff);

        BLOCKS.register(bus);
        ITEMS.register(bus);

        // Register the block and block item
        BLOCKS.register("custom_block", () -> new CustomBlock());
        ITEMS.register("custom_block", () -> new BlockItem(BLOCKS.getRegistryObject("custom_block").get(), new Item.Properties().group(ItemGroup.BUILDING_BLOCKS)));
    }

    private void setup(final FMLCommonSetupEvent event) {
        LOGGER.info("Setup method registered.");
    }

    private void doClientStuff(final FMLClientSetupEvent event) {
        LOGGER.info("Client setup method registered.");
    }
}
