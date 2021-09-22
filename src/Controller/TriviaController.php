<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TriviaController extends AbstractController
{
    /**
     * @Route("/user/events/trivia", name="trivia")
     */
    public function index(): Response
    {
        return $this->render('trivia/index.html.twig', []);
    }
}
