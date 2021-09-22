<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210511145149 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE all_time_books (id INT AUTO_INCREMENT NOT NULL, book_id INT NOT NULL, author_id INT NOT NULL, UNIQUE INDEX UNIQ_7EDDDFCE16A2B381 (book_id), UNIQUE INDEX UNIQ_7EDDDFCEF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE best_sellers (id INT AUTO_INCREMENT NOT NULL, book_id INT NOT NULL, author_id INT NOT NULL, sales VARCHAR(50) NOT NULL, UNIQUE INDEX UNIQ_909AF73B16A2B381 (book_id), UNIQUE INDEX UNIQ_909AF73BF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE new_books (id INT AUTO_INCREMENT NOT NULL, book_id INT NOT NULL, author_id INT NOT NULL, published VARCHAR(20) NOT NULL, UNIQUE INDEX UNIQ_B28D694F16A2B381 (book_id), UNIQUE INDEX UNIQ_B28D694FF675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE all_time_books ADD CONSTRAINT FK_7EDDDFCE16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
        $this->addSql('ALTER TABLE all_time_books ADD CONSTRAINT FK_7EDDDFCEF675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('ALTER TABLE best_sellers ADD CONSTRAINT FK_909AF73B16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
        $this->addSql('ALTER TABLE best_sellers ADD CONSTRAINT FK_909AF73BF675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('ALTER TABLE new_books ADD CONSTRAINT FK_B28D694F16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
        $this->addSql('ALTER TABLE new_books ADD CONSTRAINT FK_B28D694FF675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('ALTER TABLE author DROP country, DROP born, DROP died');
        $this->addSql('ALTER TABLE book DROP language, DROP pages');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE all_time_books');
        $this->addSql('DROP TABLE best_sellers');
        $this->addSql('DROP TABLE new_books');
        $this->addSql('ALTER TABLE author ADD country VARCHAR(40) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD born INT NOT NULL, ADD died INT NOT NULL');
        $this->addSql('ALTER TABLE book ADD language VARCHAR(20) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, ADD pages INT DEFAULT NULL');
    }
}
