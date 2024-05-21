package com.example.examplemod.blocks;

import net.minecraft.block.Block;
import net.minecraft.block.material.Material;

public class CustomBlock extends Block {
  public CustomBlock() {
    super(Block.Properties.create(Material.ROCK)
      .hardnessAndResistance(3.0f, 3.0f)
      .harvestLevel(2) // Iron level
      .harvestTool(net.minecraft.item.ToolType.PICKAXE)
      .setRequiresTool());
      +å
    }
}
