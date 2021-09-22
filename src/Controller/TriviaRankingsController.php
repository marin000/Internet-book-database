<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TriviaRankingsController extends AbstractController
{
    /**
     * @Route("/user/events/trivia/rankings/{id}/{triviaName}", name="trivia_rankings")
     */
    public function index(): Response
    {
        return $this->render('trivia_rankings/index.html.twig', []);
    }
}
