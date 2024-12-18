import { getAuthSession } from '@/lib/nextauth';
import {prisma } from '@/lib/db'; // Ensure prisma is properly imported
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
    params: {
        gameId: string;
    };
};

const MCQPage = async ({ params: { gameId } }: Props) => {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect('/');
    }

    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
            questions: true
}});

    return <div>{JSON.stringify(game, null, 2)}</div>;
};

export default MCQPage;
