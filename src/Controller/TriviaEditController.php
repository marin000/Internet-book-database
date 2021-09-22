<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TriviaEditController extends AbstractController
{
    /**
     * @Route("/admin/trivia/edit/{id}", name="trivia_edit")
     */
    public function index(): Response
    {
        return $this->render('trivia_edit/index.html.twig', []);
    }
}
