/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-24 15:51:26
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 10:46:58
 * @ Description:
 */

export async function apiGetSubscribedChannel()
{
    const res = await fetch('/api/youtube/channels');

    return await (res.json());
}

export async function apiGetLikedVideos()
{
    const res = await fetch('/api/youtube/liked');

    return await (res.json());
}


export async function apiGetAuth()
{
    const res = await fetch('/api/youtube/getauth');

    return await (res.json());
}