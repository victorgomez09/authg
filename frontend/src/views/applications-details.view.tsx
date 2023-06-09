import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Prism from 'prismjs'
import "prismjs/themes/prism-tomorrow.css"

import { useCustomQuery } from "../hooks/query.hook"
import { IApplication } from "../models/application.model"
import { findAppById } from "../services/application.service"

export default function ApplicationDetails() {
    const params = useParams()
    const [selectedTab, setSelectedTab] = useState<"quickStart" | "settings">("settings")
    const { data, isLoading, error } = useCustomQuery<string | undefined, IApplication>(["findApplicationById"], () => findAppById(params.id), params.id)

    useEffect(() => {
        Prism.highlightAll();
    }, [selectedTab]);

    const lines = [
        "const express = require('express');",
        "const app = express();",
        "const { authgJwt } = require('authg-express');",
        "",
        "const port = process.env.PORT || 8080;",
        "",
        `const jwtCheck = authgJwt({
            secret: 'YOUR_SECRET_KEY',
            algorithms: ['HS512'],
            audience: 'http://localhost:3000',
            issuer: 'ISSUER_URL',
          });`,
        "",
        "// enforce on all endpoints",
        "app.use(jwtCheck);",
        "",
        `app.get('/authorized', function (req, res) {
            res.send('Secured Resource');
        });`,
        "",
        "app.listen(port);",
        "",
        "console.log('Running on port ', port);"
    ].join("\n").trim();

    if (isLoading) return (
        <div className="flex flex-1 items-center justify-center">
            <span className="loading loading-dots loading-lg"></span>
        </div>
    )

    console.log(lines)
    return (
        <>
            {error && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Error! Something goes wrong.</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col justify-center">
                <div className="flex flex-col mb-4">
                    <h2 className="font-semibold text-2xl">{data?.name.toUpperCase()}</h2>
                    <span className="font-light text-sm">Identifier {data?.identifier}</span>
                    <span className="font-light text-sm">{data?.type} application</span>
                </div>
                <div className="tabs tabs-boxed bg-base-100 w-48 shadow justify-center rounded-bl-none rounded-br-none">
                    <a className={`tab ${selectedTab === "quickStart" ? "tab-active" : ""}`} onClick={() => setSelectedTab("quickStart")}>Quick start</a>
                    <a className={`tab ${selectedTab === "settings" ? "tab-active" : ""}`} onClick={() => setSelectedTab("settings")}>Settings</a>
                </div>

                <div className="card bg-base-100 shadow w-full h-full rounded-tl-none">
                    <div className="card-body overflow-auto">
                        {selectedTab === "quickStart" && (
                            <div className="flex flex-col gap-4">
                                <p className="leading-7">
                                    <span className="font-bold">1. Choose a JWT library</span>
                                    <br />
                                    As your API will be parsing JWT formatted access tokens, you will need to setup these capabilities on your API.
                                    <br />
                                    <br />
                                    You can navigate to <a className="link link-primary" href="https://jwt.io/#libraries" target="_blank">jwt.io</a> and choose from there. Remember to pick a library that support your selected signing algorithm.
                                </p>

                                <p className="leading-7 mt-4">
                                    <span className="font-bold">2. Configuring your API to accept RS256 signed tokens</span>
                                    <br />
                                    Configure the library that will validate the <span className="badge">access tokens</span> in your API. Validating a token means that you are certain you can trust its contents.
                                    <br />
                                </p>
                                <div className="mt-4">
                                    <pre className="rounded">
                                        <code className="language-js">{lines}</code>
                                    </pre>
                                </div>
                            </div>
                        )}

                        {selectedTab === "settings" && (
                            <div className="flex flex-col gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input disabled type="text" className={`input input-bordered w-full`} value={data?.name} />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea disabled className={`textarea textarea-bordered w-full`} value={data?.description} />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Identifier</span>
                                    </label>
                                    <input disabled type="text" className={`input input-bordered w-full`} value={data?.identifier} />
                                    <label className="label">
                                        <span className="label-text">Unique identifier for the API. This value will be used as the audience parameter on authorization calls.</span>
                                    </label>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Type</span>
                                    </label>
                                    <select disabled className={`select select-bordered`}>
                                        <option selected value={data?.type}>{data?.type}</option>
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Signing algorithm</span>
                                    </label>
                                    <select disabled className={`select select-bordered`}>
                                        <option selected value={data?.signingAlgorithm}>{data?.signingAlgorithm}</option>
                                    </select>
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Domain</span>
                                    </label>
                                    <input disabled type="text" className={`input input-bordered w-full`} value={`${data?.domain}/authorize`} />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Client ID</span>
                                    </label>
                                    <input disabled type="text" className={`input input-bordered w-full`} value={data?.clientId} />
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text">Secret</span>
                                    </label>
                                    <input disabled type="text" className={`input input-bordered w-full`} value={data?.clientSecret} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}