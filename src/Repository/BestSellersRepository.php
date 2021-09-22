<?php

namespace App\Repository;

use App\Entity\BestSellers;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method BestSellers|null find($id, $lockMode = null, $lockVersion = null)
 * @method BestSellers|null findOneBy(array $criteria, array $orderBy = null)
 * @method BestSellers[]    findAll()
 * @method BestSellers[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BestSellersRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BestSellers::class);
    }

    // /**
    //  * @return BestSellers[] Returns an array of BestSellers objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?BestSellers
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
