<?php
global $container;

return [
    'header' => $container->get('patternsProvider')->getPattern('components/common/header')->data(),
];
