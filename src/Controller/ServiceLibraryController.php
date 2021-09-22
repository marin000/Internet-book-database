<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Library;
use App\Repository\LibraryRepository;
use App\Entity\User;
use App\Entity\Statistics;
use App\Repository\StatisticsRepository;
require_once('C:/xampp/htdocs/IBD/vendor/autoload.php');
use Scriptotek\GoogleBooks\GoogleBooks;

class ServiceLibraryController extends AbstractController
{
    /**
     * @Route("/library/add/{id}", name="libraryAdd")
     */
    public function add(string $id): Response
    {
        $lookup = new GoogleBooks(['key' => 'google book api key']);
        $result = $lookup->volumes->get($id);

        $user=$this->getUser();

        $entityManager = $this->getDoctrine()->getManager();

        $book = new Library();
        $book->setUserId($user->getId());
        $book->setBookId($id);
        $book->setFavorite(false);
        $book->setForReading(false);
        $book->setJustReading(false);
        $book->setAlreadyRead(false);
        $book->setTitle($result->title);
        if ($result->authors) {
            $authorList="";
            foreach ($result->authors as $author) {
                $authorList.=$author." ";
            }
            $book->setAuthor($authorList);
        }
        else {
            $book->setAuthor("");
        }
        if ($result->imageLinks) {
            $book->setImage($result->imageLinks->thumbnail);
        }
        else {
            $book->setImage("https://thumbs.dreamstime.com/b/book-error-line-icon-book-error-vector-line-icon-elements-mobile-concept-web-apps-thin-line-icons-website-design-114930650.jpg");
        }


        $statCheck = $this->getDoctrine()->getRepository(Statistics::class)->findByBookId($id);
        if ($statCheck) {
            $statCheck->setLibraryNum($statCheck->getLibraryNum()+1);
        }else{
            $stat = new Statistics();
            $stat->setBookId($id);
            $stat->setTitle($result->title);
            $stat->setLibraryNum(1);
            $stat->setReviewNum(0);
            $stat->setFavoriteNum(0);
            $stat->setJustReadingNum(0);
            $stat->setForReadingNum(0);
            $stat->setAlreadyReadNum(0);
            if ($result->authors) {
                $authorList="";
                foreach ($result->authors as $author) {
                    $authorList.=$author." ";
                }
                $stat->setAuthor($authorList);
            }
            else {
                $stat->setAuthor("");
            }
            $entityManager->persist($stat);
        }

        $entityManager->persist($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/check/{id}", name="libraryCheck")
     */
    public function check(string $id): Response
    {
        $user=$this->getUser();
        if($user){
            $book = $this->getDoctrine()->getRepository(Library::class)->findBookById($user->getId(),$id);
            if($book){
                return new Response("true");
            }
        }
        return new Response("false");
    }

    /**
     * @Route("/library/delete/{id}", name="libraryDelete")
     */
    public function delete(string $id): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user=$this->getUser();
        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$id);

        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($id);
        $stat->setLibraryNum($stat->getLibraryNum()-1);
        if($book->getFavorite()==TRUE){
            $stat->setFavoriteNum($stat->getFavoriteNum()-1);
        }
        if($book->getJustReading()==TRUE){
            $stat->setJustReadingNum($stat->getJustReadingNum()-1);
        }
        if($book->getForReading()==TRUE){
            $stat->setForReadingNum($stat->getForReadingNum()-1);
        }
        if($book->getAlreadyRead()==TRUE){
            $stat->setAlreadyReadNum($stat->getAlreadyReadNum()-1);
        }
        if($book->getReview()){
            $stat->setReviewNum($stat->getReviewNum()-1);
        }

        $entityManager->remove($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/getBook/{bookId}", name="libraryGetBook")
     */
    public function getBook(string $bookId): Response
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user=$this->getUser();

        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $response = $this->json($book);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/library/api/getAll", name="LibraryAll")
     */
    public function libraryGetAll(): Response
    {
        $user=$this->getUser();
        $books = $this->getDoctrine()->getRepository(Library::class)->findBooksByUserId($user->getId());

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/library/api/getFavorite", name="LibraryFavorite")
     */
    public function libraryGetFavorite(): Response
    {
        $user=$this->getUser();

        $books = $this->getDoctrine()->getRepository(Library::class)->findFavoriteBooksByUserId($user->getId(),true);

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/library/api/getForReading", name="LibraryForReading")
     */
    public function libraryGetForReading(): Response
    {
        $user=$this->getUser();

        $books = $this->getDoctrine()->getRepository(Library::class)->findForReadingBooksByUserId($user->getId(),true);

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/library/api/getJustReading", name="LibraryJustReading")
     */
    public function libraryGetJustReading(): Response
    {
        $user=$this->getUser();

        $books = $this->getDoctrine()->getRepository(Library::class)->findJustReadingBooksByUserId($user->getId(),true);

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

    /**
     * @Route("/library/api/getAlreadyRead", name="LibraryAlreadyRead")
     */
    public function libraryGetAlreadyRead(): Response
    {
        $user=$this->getUser();

        $books = $this->getDoctrine()->getRepository(Library::class)->findAlreadyReadBooksByUserId($user->getId(),true);

        $response = $this->json($books);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }


    /**
     * @Route("/library/favorite/{bookId}", name="libraryFavorite")
     */
    public function librarySetFav($bookId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user=$this->getUser();

        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($bookId);
        if ($book->getFavorite()===false) {
            $book->setFavorite(true);
            $stat->setFavoriteNum($stat->getFavoriteNum()+1);
        }
        else {
            $book->setFavorite(false);
            $stat->setFavoriteNum($stat->getFavoriteNum()-1);
        }
        $entityManager->persist($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/forReading/{bookId}", name="libraryForReading")
     */
    public function librarySetForReading($bookId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user=$this->getUser();

        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($bookId);
        if ($book->getForReading()===false) {
            $book->setForReading(true);
            $stat->setForReadingNum($stat->getForReadingNum()+1);
        }
        else {
            $book->setForReading(false);
            $stat->setForReadingNum($stat->getForReadingNum()-1);
        }
        $entityManager->persist($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/justReading/{bookId}", name="libraryJustReading")
     */
    public function librarySetJustReading($bookId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user=$this->getUser();

        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($bookId);
        if ($book->getJustReading()===false) {
            $book->setJustReading(true);
            $stat->setJustReadingNum($stat->getJustReadingNum()+1);
        }
        else {
            $book->setJustReading(false);
            $stat->setJustReadingNum($stat->getJustReadingNum()-1);
        }
        $entityManager->persist($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/alreadyRead/{bookId}", name="libraryAlreadyRead")
     */
    public function librarySetAlreadyRead($bookId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user=$this->getUser();

        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($bookId);
        if ($book->getAlreadyRead()===false) {
            $book->setAlreadyRead(true);
            $stat->setAlreadyReadNum($stat->getAlreadyReadNum()+1);
        }
        else {
            $book->setAlreadyRead(false);
            $stat->setAlreadyReadNum($stat->getAlreadyReadNum()-1);
        }
        $entityManager->persist($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/userRating/{bookId}/{rating}", name="libraryUserRating")
     */
    public function librarySetUserRating($bookId,$rating)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $user=$this->getUser();

        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $book->setRating($rating);
        $entityManager->persist($book);
        $entityManager->flush();

        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/updateReview/{bookId}/{review}", name="libraryUpdateReview")
     */
    public function librarySetReview($bookId,$review)
    {    
        $user=$this->getUser();

        $entityManager = $this->getDoctrine()->getManager();
        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($bookId);

        $book->setReview($review);
        if($book->getReview()==null){
            $stat->setReviewNum($stat->getReviewNum()+1);
        }
        $entityManager->persist($book);
        $entityManager->flush();
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/deleteReview/{bookId}", name="libraryDeleteReview")
     */
    public function libraryDeleteReview($bookId)
    {
        $user=$this->getUser();
        $entityManager = $this->getDoctrine()->getManager();
        $book = $entityManager->getRepository(Library::class)->findBookById($user->getId(),$bookId);
        $stat = $entityManager->getRepository(Statistics::class)->findByBookId($bookId);

        $book->setReview(NULL);
        $stat->setReviewNum($stat->getReviewNum()-1);

        $entityManager->persist($book);
        $entityManager->flush();
        return new Response(Response::HTTP_OK);
    }

    /**
     * @Route("/library/statistics", name="libraryStatistics")
     */
    public function libraryStatistics(): Response
    {

        $stat = $this->getDoctrine()->getRepository(Statistics::class)->findAll();

        $response = $this->json($stat);
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'content-type');

        return $response;
    }

}
