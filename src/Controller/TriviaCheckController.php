<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TriviaCheckController extends AbstractController
{
    /**
     * @Route("/admin/trivia/checkAll", name="trivia_check")
     */
    public function index(): Response
    {
        return $this->render('trivia_check/index.html.twig', []);
    }
}
