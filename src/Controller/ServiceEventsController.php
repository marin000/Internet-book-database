<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Meetings;
use App\Repository\MeetingsRepository;
use App\Entity\User;
use App\Entity\Rankings;
use App\Repository\RankingsRepository;

class ServiceEventsController extends AbstractController
{
    /**
     * @Route("/api/getMeetings", name="getMeetings")
     */
    public function getMeetings(): Response
    {
        $meetings = $this->getDoctrine()->getRepository(Meetings::class)->findAll();

        $response = $this->json($meetings);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/saveTriviaPoints/{triviaId}/{points}", name="saveTriviaPoints")
     */
    public function saveTriviaPoints($triviaId,$points): Response
    {
        $user=$this->getUser();

        $ranking = new Rankings();
        $ranking->setUserId($user->getId());
        $ranking->setTriviaId($triviaId);
        $ranking->setPoints($points);
        $ranking->setFirstName($user->getFirstName());
        $ranking->setLastName($user->getLastName());
        $ranking->setCountry($user->getCountry());

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($ranking);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/checkUserPlayTrivia/{id}", name="checkUserPlayTrivia")
     */
    public function checkUserPlayTrivia($id): Response
    {
        $user=$this->getUser();
        $trivia = $this->getDoctrine()->getRepository(Rankings::class)->findTriviaByUserIdTriviaId($user->getId(),$id);
        if($trivia){
            return new Response("true");
        }
        return new Response("false");
    }

    /**
     * @Route("/getTriviaRankings/{id}", name="nameTriviaRankings")
     */
    public function getTriviaRankings($id): Response
    {
        $trivia = $this->getDoctrine()->getRepository(Rankings::class)->findByTriviaId($id);

        $response = $this->json($trivia);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/meetings/new", name="newMeeting")
     */
    public function createNewMeeting(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $meeting = new Meetings();
        $meeting->setName($data['name']);
        $meeting->setDateAndTime($data['dateTime']);
        $meeting->setDescription($data['description']);

        $room = rand(0,999);
        $roomStr = strval($room);
        $meeting->setRoom("IBD".$roomStr);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($meeting);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }
}