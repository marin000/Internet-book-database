<?php

namespace App\Repository;

use App\Entity\AllTimeBooks;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AllTimeBooks|null find($id, $lockMode = null, $lockVersion = null)
 * @method AllTimeBooks|null findOneBy(array $criteria, array $orderBy = null)
 * @method AllTimeBooks[]    findAll()
 * @method AllTimeBooks[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AllTimeBooksRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AllTimeBooks::class);
    }

    // /**
    //  * @return AllTimeBooks[] Returns an array of AllTimeBooks objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AllTimeBooks
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
