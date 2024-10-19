/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import {LolApi} from "twisted";
import {RegionGroups} from "twisted/dist/constants";
import * as console from "node:console";

// TODO: Add environmment vars
const api = new LolApi("Secrets");

type CollectAramDataJob = {
	riot_puuid: string;
	region: RegionGroups;
}

async function findMatchIds(puuid: string, region: RegionGroups) {
	const res = await api.MatchV5.list(puuid, region);
	return res.response;
}

async function getMatchById(matchId: string, region: RegionGroups) {
	const res = await api.MatchV5.get(matchId, region);
	return res.response;
}

async function getMatchTimeline(matchId: string, region: RegionGroups) {
	const res = await api.MatchV5.timeline(matchId, region);
	return res.response
}

async function handleUser(puuid: string, region: RegionGroups, env: Env) {
	const matches = await findMatchIds(puuid, region);

	for (const match of matches) {
		// env.DB.prepare()
	}
}

export default {
	async fetch(request: Request<unknown, IncomingRequestCfProperties<unknown>>, env: Env, ctx: ExecutionContext): Promise<Response> {
		await env.aramDataCollectionQueue.send({
			riot_puuid: "secret",
			region: RegionGroups.SEA
		})

		return new Response("Success");
	},

	async queue(batch: MessageBatch<CollectAramDataJob>, env: Env, ctx: ExecutionContext): Promise<void> {
		console.log(batch);
	}
} satisfies ExportedHandler<Env, CollectAramDataJob>
