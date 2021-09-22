<?php

namespace App\Repository;

use App\Entity\Library;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Library|null find($id, $lockMode = null, $lockVersion = null)
 * @method Library|null findOneBy(array $criteria, array $orderBy = null)
 * @method Library[]    findAll()
 * @method Library[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LibraryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Library::class);
    }

    // /**
    //  * @return Library[] Returns an array of Library objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function findBookById($userId,$bookId): ?Library
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val1','l.BookId = :val2')
            ->setParameter('val1', $userId)
            ->setParameter('val2',$bookId)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }

    public function findBooksByUserId($value): ?array
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findFavoriteBooksByUserId($value, $bool): ?array
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val', 'l.Favorite = :val2')
            ->setParameter('val', $value)
            ->setParameter('val2', $bool)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findForReadingBooksByUserId($value, $bool): ?array
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val', 'l.ForReading = :val2')
            ->setParameter('val', $value)
            ->setParameter('val2', $bool)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findJustReadingBooksByUserId($value, $bool): ?array
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val', 'l.JustReading = :val2')
            ->setParameter('val', $value)
            ->setParameter('val2', $bool)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findAlreadyReadBooksByUserId($value, $bool): ?array
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.UserId = :val', 'l.AlreadyRead = :val2')
            ->setParameter('val', $value)
            ->setParameter('val2', $bool)
            ->getQuery()
            ->getResult()
        ;
    }
}
