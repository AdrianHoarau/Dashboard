/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-20 11:43:27
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 19:22:44
 * @ Description:
 */

export async function callApiLogout()
{
    const res = await fetch('/api/logout');

    return (res.json());
}

export async function callApiLoadWidget()
{
    const res = await fetch('/api/load/widget');

    return (res.json());
}

export async function callApiClearWidget()
{
    const res = await fetch('/api/clear/widget');

    return (res.json());
}

export async function callApiDeleteWidget(index, id)
{
    const res = await fetch('/api/delete/widget?index='+index+"&id="+id);

    return (res.json());
}

export async function callApiCheckAuth()
{
    const res = await fetch('/api/checkauth');

    return (res.json());
}