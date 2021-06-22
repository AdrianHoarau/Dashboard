/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-23 22:53:12
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 14:54:39
 * @ Description:
 */

export async function apiGetPlaylists()
{
    const res = await fetch('/api/spotify/playlists');

    return await (res.json());
}

export async function apiGetTop(nb, type)
{
    const res = await fetch('/api/spotify/top?nb='+nb+'&type='+type);

    return await (res.json());
}

export async function apiGetAuth()
{
    const res = await fetch('/api/spotify/getauth');

    return await (res.json());
}