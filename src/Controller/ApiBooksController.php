<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\AllTimeBooks;
use App\Repository\AllTimeBooksRepository;
use App\Entity\BestSellers;
use App\Repository\BestSellersRepository;
use App\Entity\NewBooks;
use App\Repository\NewBooksRepository;
use Symfony\Component\HttpFoundation\JsonResponse;


class ApiBooksController extends AbstractController
{
    /**
     * @Route("/api/allTimeBooks", name="allTimeBooks")
     */
    public function allTime(): Response
    {
        $books = $this->getDoctrine()->getRepository(AllTimeBooks::class)->findAll();

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

     /**
     * @Route("/api/bestSellers", name="bestSellers")
     */
    public function bestSellers(): Response
    {
        $books = $this->getDoctrine()->getRepository(BestSellers::class)->findAll();

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/api/newBooks", name="NewBooks")
     */
    public function newBooks(): Response
    {
        $books = $this->getDoctrine()->getRepository(NewBooks::class)->findAll();

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }
}
