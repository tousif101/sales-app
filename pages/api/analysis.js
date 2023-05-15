import nc from 'next-connect';
import { checkJwt } from './middleware/checkJwt';
import {supabase} from "@/lib/supabase.js";
import { getChatGPTResponse } from '@/lib/chatGPT.js';

const handler = nc()
    .use(checkJwt)
    .get(async (req, res) => {
        const { user } = req;
        const { transcriptId } = req.query;

        const { data: analysesFromDb, error: dbError } = await supabase
            .from('analyses')
            .select('*')
            .eq('transcript_id', transcriptId)
            .limit(1);

        if (analysesFromDb && analysesFromDb.length > 0) {
            res.status(200).json(analysesFromDb[0]);
            return;
        }
        //
        const prompts = [
            "Analyze the sales call transcript and assess the sales rep's product knowledge, including their ability to convey key features and benefits, and handle product-related objections. Provide a rating on a scale of 1-10 and offer suggestions for improvement.",
            "Identify areas where the sales rep could better tailor the product presentation to the customer's needs and preferences. Provide specific examples and recommendations.",
            "Analyze the sales call transcript and determine if the sales rep effectively positioned the product against competitors or alternative solutions. Provide a rating on a scale of 1-10 and suggest ways to improve the product positioning.",
            "Extract MEDDIC data from the sales call transcript and present it in a structured format.",
            "Analyze the sales call transcript and extract the following information: 1. Highlights of the call. 2. Ending statements from both the sales rep and the customer. 3. Details about any future call setups, including scheduled dates and times. 4. Positive and negative sentiments expressed during the call. 5. An assessment of how likely the buyer is to schedule another call. 6. Improvements and tips for the sales rep to enhance their performance. 7. Any discussion related to money or critical data points that can impact the deal."
        ];


        console.log("TransciptID ", transcriptId)
        const { data: transcript, transcriptError } = await supabase
            .from('transcripts')
            .select('*')
            .eq('id', transcriptId)
            .eq('user_id', user.user.id)
            .single()

        // console.log('Transcript:', transcript.content);
        // console.log(transcript.content)
        // console.log(transcriptError)


        const analysisPromises = prompts.map(prompt => getChatGPTResponse(`${prompt}\n\nTranscript:\n${transcript.content}`));

        const analyses = await Promise.all(analysisPromises);

        if (analyses.some(a => a === null)) {
            throw new Error('Error getting ChatGPT response');
        }

        const { data, error } = await supabase
            .from('analyses')
            .insert([
                {
                    transcript_id: transcriptId,
                    user_id: user.user.id,
                    product_knowledge_analysis: analyses[0],
                    tailoring_analysis: analyses[1],
                    product_positioning_analysis: analyses[2],
                    meddic_analysis: analyses[3],
                    additional_analysis: analyses[4],
                },
            ])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json(data);
    });

export default handler;
