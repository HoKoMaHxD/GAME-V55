import { isId } from './config.js';

export function resolveAuctionVoiceRoom(source, guildId, query) {
  const rooms = [...(source.guilds.cache.get(guildId)?.channels.cache.values() || [])]
    .filter(c => [2, 13, 'GUILD_VOICE', 'GUILD_STAGE_VOICE'].includes(c.type));
  const value = query.trim().replace(/^<#(\d+)>$/, '$1');
  const matches = rooms.filter(c => isId(value) ? c.id === value : c.name === value);
  if (matches.length > 1) throw new Error('يوجد أكثر من روم صوتي بهذا الاسم في أرينا؛ أدخل آي دي الروم.');
  if (!matches.length) throw new Error('لم أجد هذا الروم الصوتي في أرينا. تأكد من الاسم أو الآي دي ووصول القارئ إليه.');
  return matches[0];
}
