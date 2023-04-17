export default function generateQuestions(conversation) {
    const questions = [
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Based on the following sales call transcript:\n\n${conversation}\n\n1. Provide a rating from 1 to 10, where 1 is poor and 10 is excellent, and an explanation of the rating. Return the result in a JSON format with key: "rating".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Based on the following sales call transcript:\n\n${conversation}\n\n2. Identify instances of rapport-building and suggest improvements for building rapport. Return the result in a JSON format with key: "rapportBuilding".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Based on the following sales call transcript:\n\n${conversation}\n\n3. Identify instances of closing techniques and suggest ways to refine the approach. Return the result in a JSON format with key: "closingTechniques".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Based on the following sales call transcript:\n\n${conversation}\n\n4. List the highlights of the call and areas where the salesperson excelled. Return the result in a JSON format with key: "highlights".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Based on the following sales call transcript:\n\n${conversation}\n\n5. Identify areas for improvement and provide specific recommendations. Return the result in a JSON format with key: "areasForImprovement".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Using the sales call transcript below:\n\n${conversation}\n\n6. Evaluate how well the salesperson addressed the customer's concerns and objections. Return the result in a JSON format with key: "addressingConcerns".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Using the sales call transcript below:\n\n${conversation}\n\n7. Provide examples of effective questioning and active listening. Return the result in a JSON format with key: "questioningAndListening".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Using the sales call transcript below:\n\n${conversation}\n\n8. Assess the salesperson's product knowledge and their ability to convey it. Return the result in a JSON format with key: "productKnowledge".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Analyze the sales call transcript provided:\n\n${conversation}\n\n9. Evaluate the salesperson's ability to establish a connection with the customer and build trust. Return the result in a JSON format with key: "establishingConnection".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Analyze the sales call transcript provided:\n\n${conversation}\n\n10. Assess the salesperson's adaptability to the customer's needs and preferences. Return the result in a JSON format with key: "adaptability".`
      },
      {
        role: 'user',
        content: `You are a very smart and licensed sales coach. Analyze the sales call transcript provided:\n\n${conversation}\n\n11. Examine the structure of the call, including the opening, presentation, and closing. Return the result in a JSON format with key: "callStructure".`
      }
    ];
    return questions;
}