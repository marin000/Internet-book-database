<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TriviaPlayController extends AbstractController
{
    /**
     * @Route("user/events/trivia/play/{id}", name="trivia_play")
     */
    public function index(): Response
    {
        return $this->render('trivia_play/index.html.twig', []);
    }
}
