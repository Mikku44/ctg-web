import React from 'react'
import type { Route } from './+types/tourCategory'


export function meta({ params }: Route.MetaArgs) {
    const { type_slug, place } = params;
    return [
        { title: `${type_slug} ${place} - Creative Tour Guru` },
        { name: "description", content: "contact page" },
    ];
}

export default function TourCategory({ params }: Route.ActionArgs) {

    const { type_slug, place } = params;
    return (
        <main className='min-h-screen'>
            <section className="container-x">
                <div className="">TYPE : {type_slug}</div>
                <div className="">PLACE : {place}</div>
            </section>
        </main>
    )
}
