<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TriviaNewController extends AbstractController
{
    /**
     * @Route("/admin/trivia/new", name="trivia_new")
     */
    public function index(): Response
    {
        return $this->render('trivia_new/index.html.twig', []);
    }
}
