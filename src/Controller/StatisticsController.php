<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StatisticsController extends AbstractController
{
    /**
     * @Route("/popularity", name="statistics")
     */
    public function index(): Response
    {
        return $this->render('statistics/index.html.twig', []);
    }
}
