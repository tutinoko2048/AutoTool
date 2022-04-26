import { world } from 'mojang-minecraft';

world.events.entityHit.subscribe(ev => {
  let { entity, hitBlock:block } = ev;
  if (!block || entity.id != 'minecraft:player') return;
  let tags = block.permutation.getTags();
  
  if (tags.includes('stone')) {
    changeSlot(entity, '_pickaxe');
  }
  
  if (tags.includes('grass') || tags.includes('dirt')) {
    changeSlot(entity, '_shovel');
  }
  
  if (tags.includes('wood')) {
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
    if (!item || !item.id.includes(type)) continue;
    player.selectedSlot = i;
  }
}
