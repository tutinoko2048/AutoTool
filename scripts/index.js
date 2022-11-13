import { world } from '@minecraft/server';

function isAxe(id) { 
  const arr = [
    'minecraft:chest'
  ]
  return arr.includes(id)
}


function isPickaxe(id) { 
  const arr = [
  ]
  return arr.includes(id) || id.includes('_ore')
}

function isShovel(id) { 
  const arr = [
  ]
  return arr.includes(id)
}

world.events.entityHit.subscribe(ev => {
  let { entity, hitBlock:block } = ev;
  if (!block || entity.typeId != 'minecraft:player') return;
  let tags = block.permutation.getTags();
  
  if (tags.includes('stone') || isPickaxe(block.type.id)) {
    changeSlot(entity, '_pickaxe');
  }
  
  if (tags.includes('grass') || tags.includes('dirt') || isShovel(block.type.id)) {
    changeSlot(entity, '_shovel');
  }
  
  if (tags.includes('wood') || isAxe(block.type.id)) {
    changeSlot(entity, '_axe');
  }
});

/**
 *
 * @param {Player} entity
 * @param {string} type
 **/
function changeSlot(player, type) {
  let container = player.getComponent('inventory').container;
  for (let i=0; i<9; i++) {
    let item = container.getItem(i);
    if (!item?.typeId?.includes(type)) continue;
    player.selectedSlot = i;
    break;
  }
}
