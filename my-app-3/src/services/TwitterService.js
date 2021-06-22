/**
 * @ Author: adrian.hoarau@epitech.eu
 * @ Create Time: 2020-11-29 02:05:15
 * @ Modified by: adrian.hoarau@epitech.eu
 * @ Modified time: 2020-11-29 20:02:59
 * @ Description:
 */

export async function apiPostTweet(tweet)
{
    const res = await fetch('/api/twitter/post?tweet='+tweet);

    return await (res.json());
}

export async function apiGetRetweets()
{
    const res = await fetch('/api/twitter/retweet');

    return await (res.json());
}

export async function apiGetFavorites()
{
    const res = await fetch('/api/twitter/liked');

    return await (res.json());
}


export async function apiGetAuth()
{
    const res = await fetch('/api/twitter/getauth');

    return await (res.json());
}