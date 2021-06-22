/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-22 17:54:13
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-22 23:43:26
 * @ Description:
 */

export async function callApi(cityName)
{
    const res = await fetch('/api/weather?city='+cityName);

    return await (res.json());
}
