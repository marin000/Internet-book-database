<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SearchResultsController extends AbstractController
{
    /**
     * @Route("/search/results", name="search_results")
     */
    public function index(): Response
    {
        return $this->render('search_results/index.html.twig', []);
    }
}
